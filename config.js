var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/Album/users';
  process.env.SESSION_URI = 'mongodb://localhost:27017/connect_mongodb_session';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/AlbumTest';
  process.env.SESSION_URI = 'mongodb://localhost:27017/connect_mongodb_session_test';
}
