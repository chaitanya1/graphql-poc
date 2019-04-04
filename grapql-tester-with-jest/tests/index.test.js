const config = require('../src/config');
const fixture = require('../tests/index-fixture.js');
const tester = require('graphql-tester').tester;
const chai = require('chai');
const assert = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Performing Graphql queries in Article service', function () {
  beforeAll(async () => {
    let res;
    try {
      res = await chai
        .request(`${config.APP_URL}`)
        .post(`/auth/v1/signin`)
        // .set('Authorization', 'Bearer ' + testUser.accessToken)
        .send({
          username: "gri",
          password: "test1234"
        });
      expect(res.status).toBe(200);
      this.usertoken = res.body.accessToken;
    } catch (err) {
      console.error(err);
      fail(err);
    }
  });

  it('Create title Data with Auth Token', done => {
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
      authorization: `Bearer ${this.usertoken}`
    });
    test(
      JSON.stringify({
        query: fixture.createTitle,

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        TitleId = res.data.createTitle.id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  it('Create Title Data without Auth Token', done => {
  
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
    });
    test(
      JSON.stringify({
        query: fixture.createTitle,

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.errors[0].message).toEqual("You must be signed in to view this resource.");
        expect(res.errors[0].extensions.code).toEqual("UNAUTHENTICATED");
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  it('Save Title Data with Auth Token', done => {
  
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
      authorization: `Bearer ${this.usertoken}`
    });
    test(
      JSON.stringify({
        query: fixture.saveTitle(TitleId),

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.saveTitle.title).toEqual("this is my prognosis");
        expect(res.data.saveTitle.id).toEqual(TitleId);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  it('Save Title Data without Auth Token', done => {
  
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
    });
    test(
      JSON.stringify({
        query: fixture.saveTitle(TitleId),

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.errors[0].message).toEqual("You must be signed in to view this resource.");
        expect(res.errors[0].extensions.code).toEqual("UNAUTHENTICATED");
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  it('Publish Title Data with Auth Token', done => {
  
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
      authorization: `Bearer ${this.usertoken}`
    });
    test(
      JSON.stringify({
        query: fixture.publishTitle(TitleId),

      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.publishTitle.title).toEqual("this is my prognosis");
        expect(res.data.publishATitle.id).toEqual(TitleId);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  it('Publish Title Data without Auth Token', done => {
  
    const test = tester({
      url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
      contentType: 'application/json',
    });
    test(
      JSON.stringify({
        query: fixture.publishTitle(TitleId),

      })
    )
      .then(res => {
         expect(res.status).toBe(200);
        expect(res.errors[0].message).toEqual("You must be signed in to view this resource.");
        expect(res.errors[0].extensions.code).toEqual("UNAUTHENTICATED");
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  // it('Apply event filter in Title', done => {
  //   const test = tester({
  //     url: `${config.APP_URL}/${config.GQL_URL_DIR}`,
  //     contentType: 'application/json',
  //     authorization: `Bearer ${this.usertoken}`
  //   });
  //   test(
  //     JSON.stringify({
  //       query: `query{
  //       Titles (
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
