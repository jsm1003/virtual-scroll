const Mock = require('mockjs');
const express = require('express');

const Random = Mock.Random;
const mock = Mock.mock;

const proxy = {
  'GET /api/user': {
    name: Random.cname(),
    userId: Random.id(),
    date: Random.date('yyyy-MM-dd'),
  },
  'GET /api/user/list': mock({
    'array|3': [
      {
        id: 1,
        username: 'kenny',
        sex: 'male',
      },
    ],
  }),
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  'POST /api/login/account': (req, res) => {
    return res.json({
      status: 'ok',
      data: {
        id: Random.id(),
        userName: Random.cname(),
        city: Random.city(),
      },
    });
  },
};

module.exports = proxy;
