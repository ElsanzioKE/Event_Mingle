// Middleware to parse JSON and use CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then()) => console.log("MongoDB Connected"))
	.catch((err) => console.error("MongoDB connection error"));
// Start the server on the specified
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server running on port ${PORT}');
});

