/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ywkmy9xugei0gyn")

  collection.name = "testimonios"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ywkmy9xugei0gyn")

  collection.name = "testiomonios"

  return dao.saveCollection(collection)
})
