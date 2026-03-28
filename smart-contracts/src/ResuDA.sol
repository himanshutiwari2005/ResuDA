// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResuDA {
    struct NewsItem {
        uint256 id;
        string contentHash;
        string url;
        address reporter;
        uint256 timestamp;
    }

    struct CorrectionNote {
        uint256 id;
        uint256 newsId;
        string content;
        address author;
        uint256 timestamp;
        uint256 likes;
        uint256 dislikes;
    }

    uint256 public newsCount;
    uint256 public notesCount;

    mapping(uint256 => NewsItem) public newsItems;
    mapping(uint256 => uint256[]) public newsToNotes;
    mapping(uint256 => CorrectionNote) public notes;
    mapping(address => int256) public reputation;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event NewsAdded(uint256 indexed id, string contentHash, string url, address reporter);
    event NoteAdded(uint256 indexed id, uint256 indexed newsId, address author);
    event NoteVoted(uint256 indexed id, address indexed voter, bool isLike);

    function addNews(string memory _contentHash, string memory _url) public returns (uint256) {
        newsCount++;
        newsItems[newsCount] = NewsItem(newsCount, _contentHash, _url, msg.sender, block.timestamp);
        emit NewsAdded(newsCount, _contentHash, _url, msg.sender);
        return newsCount;
    }

    function addNote(uint256 _newsId, string memory _content) public returns (uint256) {
        require(_newsId > 0 && _newsId <= newsCount, "Invalid news ID");
        notesCount++;
        notes[notesCount] = CorrectionNote(notesCount, _newsId, _content, msg.sender, block.timestamp, 0, 0);
        newsToNotes[_newsId].push(notesCount);
        emit NoteAdded(notesCount, _newsId, msg.sender);
        return notesCount;
    }

    function voteNote(uint256 _noteId, bool _isLike) public payable {
        require(_noteId > 0 && _noteId <= notesCount, "Invalid note ID");
        require(!hasVoted[_noteId][msg.sender], "Already voted");
        require(msg.value == 0.0001 ether, "Must send exactly 0.0001 MONAD to vote");

        CorrectionNote storage note = notes[_noteId];
        hasVoted[_noteId][msg.sender] = true;

        if (_isLike) {
            note.likes++;
            reputation[note.author]++;
            // Reward the author
            (bool success, ) = payable(note.author).call{value: msg.value}("");
            require(success, "Reward transfer failed");
        } else {
            note.dislikes++;
            reputation[note.author]--;
            // Burn the fee to prevent trolling
            (bool success, ) = payable(address(0)).call{value: msg.value}("");
            // Note: address(0) transfer might fail on some chains, but for burning 
            // 0x000000000000000000000000000000000000dEaD is more standard
            (success, ) = payable(address(0x000000000000000000000000000000000000dEaD)).call{value: msg.value}("");
            require(success, "Burn transfer failed");
        }

        emit NoteVoted(_noteId, msg.sender, _isLike);
    }

    function getNotesForNews(uint256 _newsId) public view returns (uint256[] memory) {
        return newsToNotes[_newsId];
    }
}
