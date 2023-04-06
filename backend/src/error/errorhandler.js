const { json } = require("express");

exports.trycatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        next(err);
    }
};

exports.errorHandler = (err, req, res, next) => {
    if (err.message === "Unauthorized") {
        return res.status(401).json({
            error: err.message,
            message: "You are not authorized to perform this action",
        });
    }

    if (err.message === "Link expired") {
        return res.status(401).json({
            error: err.message,
            message: "Link expired",
        });
    }

    if (err.message === "Invalid tag") {
        return res.status(400).json({
            error: err.message,
            message: "Invalid tag",
        });
    }

    return res.status(500).json({
        error: err.message,
        message: "Something went wrong",
    });
};
