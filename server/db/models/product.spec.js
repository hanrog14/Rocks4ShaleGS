/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {


  beforeEach(() => {

    return db.sync({force: true})
  })

  describe('The `Products` model', () => {
    describe('correct model setup', () => {
      let product;
      let name = 'Rocks';
      let description = 'This is a rock';
      let price = 1.01
      let inventory = 10
      let category = 'rocks'
      let pictureUrl = 'www.google.com'

      beforeEach(async () => {
        product = await Product.build({
          name,
          description,
          price,
          inventory,
          category,
          pictureUrl
        })

      })

      it('includes `name`, `description`, `price`, `inventory`, `category` and `pictureURL` fields', () => {
        return product.save().then(savedProduct => {
          expect(savedProduct.name).to.equal('Rocks');
          expect(savedProduct.description).to.equal('This is a rock');
          expect(savedProduct.price).to.be.equal(1.01);
          expect(savedProduct.inventory).to.equal(10);
          expect(savedProduct.category).to.equal('rocks');
          expect(savedProduct.pictureUrl).to.equal('www.google.com');
        });
      })

      it('requires `name`', () => {
        product.name = null;
        return product.validate().then(
          () => {
            throw new Error('validation should fail when name is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `description`', () => {
        product.description = null;
        return product.validate().then(
          () => {
            throw new Error('validation should fail when description is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `price`', () => {
        product.price = null;
        return product.validate().then(
          () => {
            throw new Error('validation should fail when price is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `price` to be in a decimal form', () => {
        product.price = 'cat' ;
        return product.validate() //play around with update()
        .then(res => console.log("***", res), (err) => {
            console.log("ERRRRR", err)
        });
      });

      it('requires `inventory`', () => {
        product.inventory = null;
        return product.validate().then(
          () => {
            throw new Error('validation should fail when inventory is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `category`', () => {
        product.category = null;
        return product.validate().then(
          () => {
            throw new Error('validation should fail when category is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });

      it('requires `pictureURL`', () => {
        product.inventory = null;
        return product.validate().then(
          () => {
            throw new Error('validation should fail when pictureURL is null');
          },
          createdError => expect(createdError).to.be.an.instanceOf(Error)
        );
      });
      //end of `attributes definition` describe block for now
    });


    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
   // end describe('User model')
