const Starter = artifacts.require('Starter');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Starter', ([deployer, investor]) => {
  let starter
  //before hook for cleaning up dups
  before(async () => {
    starter = await Starter.new()
  })

  describe('Starter deployment', async () => {
    it('contract has a name', async () => {
      const name = await starter.name()
      assert.equal(name, "Herry Xu")
    })
    it('contract has a email', async () => {
      const email = await starter.email()
      assert.equal(email, "herryxu123@gmail.com")
    })
    it('contract has a website', async () => {
      const website = await starter.website()
      assert.equal(website, "www.herryxu.me")
    })
  })
})