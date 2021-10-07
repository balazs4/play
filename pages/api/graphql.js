import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => `world`
};

export default async function handler(req, res) {
  if (req.body === null) {
    res.status(412);
    return;
  }
  const source = req.body;
  console.log({source});
  const result = await graphql({ schema, rootValue, source});
  res.status(200).json(result);
}
