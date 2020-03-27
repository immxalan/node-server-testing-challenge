// our connection to the database
const db = require('../data/dbConfig.js');

// the data access file we are testing
const Hobbits = require('./hobbitsModel.js');

describe('hobbits model', () => {
    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('hobbits').truncate();
      });
  describe('insert()', () => {
    // this example uses async/await to make it easier to read and understand
    it('should insert the provided hobbits into the db', async () => {
      // this code expects that the table is empty, we'll handle that below
      // add data to the test database using the data access file
      await Hobbits.insert({ name: 'gaffer' });
      await Hobbits.insert({ name: 'sam' });

      // read data from the table
      const hobbits = await db('hobbits');

      // verify that there are now two records inserted
      expect(hobbits).toHaveLength(2);
    })
    // note we're checking one hobbit at a time
    it('should insert the provided hobbit into the db', async () => {
    let hobbit = await Hobbits.insert({ name: 'gaffer' });
    expect(hobbit.name).toBe('gaffer');
  
    // note how we're reusing the hobbit variable
    hobbit = await Hobbits.insert({ name: 'sam' });
    expect(hobbit.name).toBe('sam');
  });;
  });
});