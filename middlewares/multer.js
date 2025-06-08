import multer from 'multer';

const storage = multer.memoryStorage(); // Store in memory for direct Cloudinary upload

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) cb(null, true);
	else cb(new Error("Only image files are allowed!"), false);
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
}); // 5MB limit

export default upload;


//----- Auto Fill -----
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   } 
// });


// ----- Great Stack -----
// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });
// export const uploadMiddleware = upload.single('image');