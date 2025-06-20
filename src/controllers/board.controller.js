import { Board } from "../Models/Board.model.js";

const createBoard = async (req, res) => {
  try {
    const name = req.body?.name
    const newBoard = new Board({
      name: name ? name : "sample",
    });

    const response = newBoard.save();

    if (!response) {
      return res.status(500).json({
        message: "could not create board",
      });
    }

    res.status(200).json({
      board: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getAllBoards = async (req, res) => {
  try {
    const allBoards = await Board.find({});
    if (!allBoards) {
      return res.status(400).json({
        message: "no boards found",
      });
    }

    res.status(200).json({
      data: allBoards,
    });
  } catch (error) {
    res.status(500).json({
        error
    })
  }
};

const deleteBoard = async (req, res) => {
  try {
    const boardId = req.params?.id;
    const response = await Board.findByIdAndDelete(boardId);
    if (!response) {
      res.status(500).json({
        message: "no board found",
      });
    }
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export { createBoard, getAllBoards, deleteBoard };
