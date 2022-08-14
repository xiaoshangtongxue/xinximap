/*module.exports = {
    mode: "development",
    entry: {"index1":"./demo-company.js",
            "index2":"./demo-achievement.js"
        },
    output: {
        filename: "[name].js"
    },
    devtool: "source-map"
};*/
module.exports = {
    mode: "development",
    entry: {'bundle-01':"./demo-achievement.js",
            'bundle-02':"./demo-company.js",
            'bundle-03':"./demo-instrument.js",
            'bundle-04':"./demo-projection.js",
      
            'bundle-05':"./demo-talent.js"
  
           },
    output: {
        filename: '[name].js'
    },
    devtool: "source-map"
};
