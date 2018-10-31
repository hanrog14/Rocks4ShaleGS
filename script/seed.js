'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'jolene@gh.com', password: '123', adminStatus: true}),
    User.create({email: 'hannahR@gh.com', password: '123', adminStatus: true}),
    User.create({email: 'hannahB@gh.com', password: '123', adminStatus: true}),
    User.create({email: 'seori@gh.com', password: '123', adminStatus: true})
  ])

  const products = await Promise.all([
    Product.create({name: 'Basalt', description: `A fine grained, dark-colored extrusive rock. Mainly composed of plagioclase and pyroxene. This is a 10" by 12" slab.`, price: 1.00, inventory: 1, category: 'Igneous', pictureUrl: 'https://geology.com/rocks/pictures/basalt.jpg'}),

    Product.create({name: 'Dacite', description: `A fine grained, extrusive rock that is usually light in color. It has a composition that is intermediate between rhyolite and andesite. This is a 10" by 12" slab`, price: 4.52, inventory: 50, category: 'Igneous', pictureUrl: 'https://geology.com/rocks/pictures/dacite.jpg'}),

    Product.create({name: 'Granite', description: `A coarse-grained, light-colored, intrusive rock that contains mainly quartz, feldspar, and mica minerals. This is a 10" by 12" slab.`, price: 16.13, inventory: 43, category: 'Igneous', pictureUrl: 'https://geology.com/rocks/pictures/granite-coarse-grained.jpg'}),

    Product.create({name: 'Obsidian', description: `A dark-colored volcanic glass that forms from the very rapid cooling of molten rock material. It cools so rapidly that crystals do not form. This is a 10" by 12" slab.`, price: 18.74, inventory: 76, category: 'Igneous', pictureUrl: 'https://geology.com/rocks/pictures/obsidian.jpg'}),

    Product.create({name: 'Pumice', description: `A light-colored vesicular rock. It forms through very rapid solidification of a melt. The vesicular texture is a result of gas trapped in the melt at the time of solidification. This is a 10" by 12" slab.`, price: 4.20, inventory: 375, category: 'Igneous', pictureUrl: 'https://geology.com/rocks/pictures/pumice.jpg'}),

    Product.create({name: 'Fire Opal', description: `This is sometimes found filling cavities in rhyolite. Long after the rhyolite has cooled, silica-rich ground water moves through the rock, sometimes depositing gems like opal, red beryl, topaz, jasper, or agate in the cavities of the rock. This is a 1" cube.`, price: 497.22, inventory: 8, category: 'Igneous', pictureUrl: 'https://geology.com/rocks/pictures/rhyolite-fire-opal.jpg'}),

    Product.create({name: 'Gneiss', description: `A foliated metamorphic rock that has a banded appearance and is made up of granular mineral grains. It typically contains abundant quartz or feldspar minerals. This is a 10" by 12" slab.`, price: 4.25, inventory: 93, category: 'Metamorphic', pictureUrl: 'https://geology.com/rocks/pictures/gneiss.jpg'}),

    Product.create({name: 'Marble', description: `A non-foliated metamorphic rock that is produced from the metamorphism of limestone or dolostone. It is composed primarily of calcium carbonate. This is a 10" by 12" slab.`, price: 12.95, inventory: 311, category: 'Metamorphic', pictureUrl: 'https://geology.com/rocks/pictures/marble.jpg'}),

    Product.create({name: 'Quartzite', description: `A non-foliated metamorphic rock that is produced by the metamorphism of sandstone. It is composed primarily of quartz. This is a 10" by 12" slab.`, price: 6.37, inventory: 67, category: 'Metamorphic', pictureUrl: 'https://geology.com/rocks/pictures/quartzite.jpg'}),

    Product.create({name: 'Slate', description: `A foliated metamorphic rock that is formed through the metamorphism of shale. It is a low-grade metamorphic rock that splits into thin pieces. This is a 10" by 12" slab.`, price: 2.99, inventory: 549, category: 'Metamorphic', pictureUrl: 'https://geology.com/rocks/pictures/slate.jpg'}),

    Product.create({name: 'Soapstone', description: `A metamorphic rock that consists primarily of talc with varying amounts of other minerals such as micas, chlorite, amphiboles, pyroxenes, and carbonates. It is a soft, dense, heat-resistant rock that has a high specific heat capacity. These properties make it useful for a wide variety of architectural, practical, and artistic uses. This is a 10" by 12" slab.`, price: 13.99, inventory: 55, category: 'Metamorphic', pictureUrl: 'https://geology.com/minerals/talc/talc-soapstone-79.jpg'}),

    Product.create({name: 'Coal', description: `An organic sedimentary rock that forms mainly from plant debris. The plant debris usually accumulates in a swamp environment. Coal is combustible and is often mined for use as a fuel. This is a 10" by 12" slab.`, price: 15.03, inventory: 1205, category: 'Sedimentary', pictureUrl: 'https://geology.com/rocks/pictures/coal.jpg'}),

    Product.create({name: 'Limestone', description: `A rock that is composed primarily of calcium carbonate. It can form organically from the accumulation of shell, coral, algal, and fecal debris. It can also form chemically from the precipitation of calcium carbonate from lake or ocean water. Limestone is used in many ways. Some of the most common are: production of cement, crushed stone, and acid neutralization. This is a 10" by 12" slab.`, price: 5.99, inventory: 12, category: 'Sedimentary', pictureUrl: 'https://geology.com/rocks/pictures/limestone.jpg'}),

    Product.create({name: 'Rock Salt', description: `A chemical sedimentary rock that forms from the evaporation of ocean or saline lake waters. It is also known by the mineral name "halite." It is rarely found at Earth's surface, except in areas of very arid climate. It is often mined for use in the chemical industry or for use as a winter highway treatment. Some halite is processed for use as a seasoning for food. This is a 10" by 12" slab.`, price: 4.99, inventory: 114, category: 'Sedimentary', pictureUrl: 'https://geology.com/rocks/pictures/halite.jpg'}),

    Product.create({name: 'Sandstone', description: `A clastic sedimentary rock made up mainly of sand-size (1/16 to 2 millimeter diameter) weathering debris. Environments where large amounts of sand can accumulate include beaches, deserts, flood plains, and deltas. This is a 10" by 12" slab.`, price: 8.77, inventory: 23, category: 'Sedimentary', pictureUrl: 'https://geology.com/rocks/pictures/sandstone.jpg'}),

    Product.create({name: 'Shale', description: `A clastic sedimentary rock that is made up of clay-size (less than 1/256 millimeter in diameter) weathering debris. It typically breaks into thin flat pieces. This is a 10" by 12" slab.`, price: 3.89, inventory: 598345, category: 'Sedimentary', pictureUrl: 'https://geology.com/rocks/pictures/shale.jpg'}),

    Product.create({name: 'Soil', description: `This is a pile of dirt. A 10qt. bag.`, price: 2.79, inventory: 99, category: 'Miscellaneous', pictureUrl: 'https://png.pngtree.com/element_origin_min_pic/17/06/26/e820b845033c478b217052760309e72e.jpg'}),

    Product.create({name: 'Clay', description: `Lightly hydrated clay for molding purposes. A 50lbs. bag.`, price: 21.79, inventory: 43, category: 'Miscellaneous', pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG6Crz5lN-S6Dtsu78uBn_4KfiiNYHddvr3pMjcJFuIGzgKn7efg'}),

    Product.create({name: 'Leaves', description: `A neatly raked pile of Autumn leaves. 400 leaves per bag.`, price: 9.99, inventory: 34, category: 'Miscellaneous', pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ox-TN0NWjcxOSzomO_USTUJtLwlL5ib4rglHszaei5X9kZEW'}),

    Product.create({name: 'Nails', description: `Fresh piles of nails, either fresh or oxidized. Pack of 50.`, price: 5.99, inventory: 27, category: 'Miscellaneous', pictureUrl: 'http://s3.amazonaws.com/bvsystem_tmp/pages/1310/original/nails.jpg?1314041354'}),

    Product.create({name: 'Sand', description: `Freshly collected from artesean beaches. A 50lbs. bag.`, price: 5.99, inventory: 13, category: 'Miscellaneous', pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tannin_heap.jpeg/1200px-Tannin_heap.jpeg'}),

    Product.create({name: 'Driftwood', description: `Blown from the finest forests. 10 - 14"`, price: 14.99, inventory: 3, category: 'Miscellaneous', pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmEwv4P5uaRW3uPP7xYvgZ77uxrOJ782AVKS9blYgGTIkBDJzsJA'}),

    Product.create({name: 'Bricks', description: `Lightly worn loose bricks. Pallet size.`, price: 80.00, inventory: 80, category: 'Miscellaneous', pictureUrl: 'https://c.o0bg.com/rf/image_960w/Boston/2011-2020/2016/06/30/BostonGlobe.com/Business/Images/shutterstock_36496531.jpg'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)

}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
