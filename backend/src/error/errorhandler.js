exports.trycatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res);
    } catch (err) {
        next(err);
    }
};

exports.errorHandler = (err, req, res, next) => {
    return res.status(500).json({
        error: err.message,
        message: "Something went wrong",
    });
};
