module.exports = async function AddFlightMiddleware(req, res, next) {
    const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
    try {
        if (!airline || !flightNo || !departure || !arrival ||
            !departureTime || !arrivalTime || !seats || !price) return res.send({ msg: 'Please Provide all details' });
        next()
    } catch (error) {

    }
}

// airline: String,
// flightNo: String,
// departure: String,
// arrival: String,
// departureTime: Date,
// arrivalTime: Date,
// seats: Number,
// price: Number