
class ApiSearchFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    search(){
        // console.log("before",this.queryString.keyword && JSON.parse(this.queryString.keyword))
        
        
        const searched = this.queryString.keyword ? { // not working from front end
            // const searched = JSON.parse(this.queryString.keyword).keyword ?{
                name:{
                    $regex : this.queryString.keyword, // not working from front end
                    // $regex : JSON.parse(this.queryString.keyword).keyword,
                    $options : "i"
                }
            } : {}
            
        this.query = this.query.find({...searched})

        return this
    }

    filter(){
        const copyQueryStrings = {...this.queryString}

        const arrayToBeRemove = ["keyword", "page","priceStart", "priceEnd", "limit"]

        arrayToBeRemove.forEach(arr=> delete copyQueryStrings[arr])

        const query_string = JSON.stringify(copyQueryStrings)

        const pattern = /\b(gt|gte|lt|lte)\b/g

       const chnagedValue = query_string.replace(pattern, (changeVal)=>`$${changeVal}`)

        this. query = this.query.find(JSON.parse(chnagedValue))

        return this
    }

    pagination(resultPerPage){
        const currtentPage = Number(this.queryString.page) || 1

        const skip = resultPerPage * (currtentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }
}

module.exports = ApiSearchFeatures