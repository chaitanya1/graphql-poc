const variables = require('../tests/index.test.js');


module.exports = {
  createTitle: `mutation{
    createTitle(title:"hello user"){
      id
    }
  }`,
  saveArticle: (TitleId) => {
    return `mutation {
      saveTitle(id: \"${TitleId}\",title: \"this is my prognosis\", draftContent: \"I am from the town of Dersh \") {
        title
        id
        draftContent
      }
    }`;
  },
  publishTitle: (TitleId) => {
    return `mutation {
      publishTitle(id: \"${TitleId}\",title: \"this is my prognosis\", draftContent: \"I am from the town of Dershaust which is famous for its cattle grown for milk. I am from the town of Dershaust which is famous for its cattle grown for milk. I am from the town of Dershaust which is famous for its cattle grown for milk. I am from the town of Dershaust which is famous for its cattle grown for milk. I am from the town of Dershaust which is famous for its cattle grown for milk.\") {
        title
        id
        draftContent
        createdAt
        updatedAt
        postId
      }
    }`;
  }
};
