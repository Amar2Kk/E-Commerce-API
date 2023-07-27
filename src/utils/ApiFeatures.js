export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  //pagination
  paginate() {
    let page = this.queryString.page * 1 || 1
    if (this.queryString.page <= 0) page = 1;
    const skip = (page - 1) * 5
    this.page = page
    this.mongooseQuery.skip(skip).limit(5)
    return this
  }
  //filtration
  filter() {
    let filterObj = { ...this.queryString }
    let excludedQueries = ['page', 'sort', 'fields', 'keyword']
    excludedQueries.forEach((e) => {
      delete filterObj[e]
    })
    filterObj = JSON.stringify(filterObj)
    filterObj = filterObj.replace(/\b(ge|gte|lt|lte)\b/g, match => `$${match}`)
    filterObj = JSON.parse(filterObj)
    this.mongooseQuery.find(filterObj)
    return this
  }
  //sorting
  sort() {
    if (this.queryString.sort) {
      let sortingQueries = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery.sort(sortingQueries)
    }
    return this
  }
  //search
  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: this.queryString.keyword, $options: 'i' } },
          { title: { $regex: this.queryString.keyword, $options: 'i' } },
          { description: { $regex: this.queryString.keyword, $options: 'i' } }
        ]
      })
    }
    return this
  }
  //selecting fields
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery.select(fields)
    }
    return this
  }
}