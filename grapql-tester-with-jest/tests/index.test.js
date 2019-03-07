const config = require('../src/config');
const tester = require('graphql-tester').tester;
const chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Performing Graphql queries in Article service', function () {
  beforeAll(async () => {
    let res;
    try {
      res = await chai
        .request(`${config.APP_URL}`)
        .post(`/auth/signin`)
        // .set('Authorization', 'Bearer ' + testUser.accessToken)
        .send({
          username: "griesham",
          password: "test1234"
        });
      expect(res.status).toBe(200);
      this.usertoken = res.body.accessToken;
    } catch (err) {
      console.error(err);
      fail(err);
    }
  });

  it('Get Article Data with Auth Token', done => {
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
      authorization: `Bearer ${this.usertoken}`
    });
    test(
      JSON.stringify({
        query: `mutation{
            createArticle(title:"hello user"){
              id
            }
          }`,

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });

  it('Get Article Data without Auth Token', done => {
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
    });
    test(
      JSON.stringify({
        query: `mutation{
            createArticle(title:"hello user"){
              id
            }
          }`,

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  // it('Apply event filter in articles', done => {
  //   const test = tester({
  //     url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
  //     contentType: 'application/json',
  //     authorization: `Bearer ${this.usertoken}`
  //   });
  //   test(
  //     JSON.stringify({
  //       query: `query{
  //       articles (
  //         filter: "{\"eventId\": {\"$eq\":91468} }"
  //       ){
  //         title
  //         id
  //         eventId
  //       }
  //     }`,

  //     })
  //   )
  //     .then(res => {
  //       expect(res.status).toBe(200);
  //       console.log(res);
  //       expect(res.success).toBe(true);
  //       done();
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       done();
  //     });
  // });
});
