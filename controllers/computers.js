const mongodb = require('../db/database');
const ObjectId = require ('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try{
      const result = await mongodb
          .getDB()
          .db()
          .collection('consoles')
          .find();
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err) {
      res.status(500).json({message: err.message});
    }
  };
const getSingle = async (req, res, next) => {
    try{
      const consoleId = new ObjectId(req.params.id);
      const result = await mongodb
            .getDB()
            .db()
            .collection('consoles')
            .find({ _id: consoleId });
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch(err) {
      res.status(500).json(err);
  }
  };
const updateCons= async (req,res)=>{
    const consoleId = new ObjectId(req.params.id);
    const consoleBody = {
      console_id: req.body.console_id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      generation: req.body.generation,
      unitSold: req.body.unitSold,
      yearRelease: req.body.yearRelease,
      yearDiscont: req.body.yearDiscont
    };
    const result = await mongodb
      .getDB()
      .db()
      .collection('consoles')
      .replaceOne({_id: consoleId}, consoleBody);
      console.log(result);
      if (result.modifiedCount > 0 ){
        res.status(204).send();
      }else {
        res.status(500).json(result.error || "Error while Updating");
      }
  };
const createCons= async (req,res)=>{
    const consoleBody = {
        console_id: req.body.console_id,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        generation: req.body.generation,
        unitSold: req.body.unitSold,
        yearRelease: req.body.yearRelease,
        yearDiscont: req.body.yearDiscont
    };
    const result = await mongodb
      .getDB()
      .db()
      .collection('consoles')
      .insertOne(consoleBody);
      if (result.acknowledged) {
        res.status(201).json(result);
      }else {
        res.status(500).json(result.error || "Error while Creating");
      }
  
  };
const deleteCons= async(req,res)=>{
    const consoleId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDB()
      .db()
      .collection('consoles')
      .deleteOne({_id:consoleId});
      if (result.deletedCount > 0) {
        res.status(204).send();
      }else {
        res.status(500).json(result.error || 'Error while deleting');
      }
  };

  module.exports = {
    getAll,
    getSingle,
    updateCons,
    createCons,
    deleteCons
  }