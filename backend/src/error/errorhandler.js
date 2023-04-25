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

    else if (err.message === "Link expired") {
        return res.status(401).json({
            error: err.message,
            message: "Link expired",
        });
    }

    else if (err.message === "Invalid tag") {
        return res.status(400).json({
            error: err.message,
            message: "Invalid tag",
        });
    }

    else if (err.message === "Student not found") {
        return res.status(404).json({
            error: err.message,
            message: "Student not found",
        });
    }

    else if (err.message === "User not found") {
        return res.status(404).json({
            error: err.message,
            message: "User not found",
        });
    }

    else if (err.message === "Invalid credentials") {
        return res.status(401).json({
            error: err.message,
            message: "Invalid credentials",
        });
    }

    else if (err.message === "Company not found") {
        return res.status(404).json({
            error: err.message,
            message: "Company not found",
        });
    }

    else if (err.message === "Email not sent") {
        return res.status(400).json({
            error: err.message,
            message: "Email not sent",
        });
    }

    return res.status(500).json({
        error: err.message,
        message: "Something went wrong",
    });
};
