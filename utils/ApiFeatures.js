class ApiFeatures {
  constructor(query, queryString) {
    this.queryString = queryString;
    this.query = query;
  }
  filter() {
    const queryObj = { ...this.queryString }; // зберігаємо дані у змінну не змінюючи її
    const executed = ['sort', 'limit', 'page', 'fields']; // масив виключень

    executed.forEach((el) => delete queryObj[el]); // видаляємо виключеня з попереднього масиву

    // ADVANCED FILTER
    let queryStr = JSON.stringify(queryObj); //перетворюємо об*єкт в стрінгу
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`); //заміняємо gte na $gte

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortedBy = this.queryString.sort.split(',').join(' ');

      console.log(sortedBy);

      this.query = this.query.sort(sortedBy);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  pageing() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
