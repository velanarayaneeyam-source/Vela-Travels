const bcrypt = require('bcryptjs');
const hash = '$2b$10$9qK8sj6DdLfU9PxhLXpiPeuQo9qdbizn1axjOCblDmf4h7MFooqra';
console.log(bcrypt.compareSync('admin123', hash));
