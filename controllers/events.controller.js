const { Event } = require("../models/event.model");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const { User } = require("../models/user.model");
const stripe = require('stripe')("sk_test_51KwqvXDAJzKbyS5lYzJiCan0S35slq2p1ezeLHHX7jU7tJlNhh1VT7d91uR3ZminsUpEkGXZQyWZbWOcuOeRjkkC00esVMXSg5"
  , {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
      name: "stripe-samples/accept-a-payment/custom-payment-flow",
      version: "0.0.2",
      url: "https://github.com/stripe-samples"
    }
  });
module.exports = {
  getAllEventCreatedBy: async (req, res) => {
    const { emailcreateur } = req.params;
    const events = await Event.find({ emailcreateur });
    res.send(events);
  },
  getAllEvent: async (req, res) => {
    const events = await Event.find();
    res.send(events);
  },
  createEvent: async (req, res) => {
    console.log(req.file)
    const { titre, description, emailcreateur, phonecreateur, date, price } = req.body;
    console.log(req.body)
    console.log(req.body.Longitude)
    const event = new Event({ titre, description, Longitude: req.body.Longitude, Latitude: req.body.Latitude, emailcreateur, image: req.file.filename, phonecreateur, date, price });
    await event.save();
    res.send(event);
  },
  createEventWithoutImage: async (req, res) => {
    const { titre, description, date } = req.body;
    const event = new Event({ titre, description, date });
    await event.save();
    res.send(event);
  },
  createEventWithImage: async (req, res) => {
    console.log(req.file)
    const { titre, description, date, Longitude, Latitude, price } = req.body;

    const event = new Event({ titre, description, image: req.file.filename, date, Longitude, Latitude, price });
    await event.save();
    res.send(event);
  },
  updateEvent: (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    Event.updateOne(
      { _id: id },
      { titre: req.body.titre, description: req.body.description },
      function (err) {
        if (err) {
          console.log("failed");
        } else {
          console.log("success update");
        }
      }
    );
    return res.send("update");
  },

  deleteEvent: (req, res) => {
    console.log("en cour");
    const { id } = req.params;
    console.log(id);
    Event.findByIdAndRemove(id, function (err) {
      if (!err) {
        console.log("success");
      } else {
        console.log("failed");
      }
    });
    return res.send("deleted");
  },
  //camper participate to event app.put("/event/participate/:id"
  participateToEvent: async (req, res) => {
    const { idevent } = req.params;
    const { iduser } = req.params;
    const user = await User.findById(iduser)

    const event = await Event.findById(idevent);
    event.participants.push(user)
    console.log(req.body);
    await Event.findByIdAndUpdate(idevent, event)
    /*Event.updateOne({event}, function (err) {
      if (err) {
        console.log("failed");
      } else {
        console.log("success update");
      }
    });*/
    return res.send({ exist: true });
  },
  UserAlreadyParticipate: async (req, res) => {
    const { _id } = req.params
    const { email } = req.params
    console.log("hello")
    const userIsFoundInevent = await Event.findOne({ _id, participants: { $elemMatch: { email } } });
    console.log(userIsFoundInevent)
    if (userIsFoundInevent) {
      return res.json({ exist: true });
    }
    return res.json({ exist: false });
  },
  UsersParticipate: async (req, res) => {
    const { _id } = req.params
    console.log("hello")
    const event = await Event.findOne({ _id });
    console.log(event.participants.length)
    if (event.participants.length > 0) {
      return res.json({ usersExist: true });
    }
    return res.json({ usersExist: false });
  },




  stripe: async (req, res) => {
    const { paymentMethodType, currency, paymentMethodOptions } = req.body;

    // Each payment method type has support for different currencies. In order to
    // support many payment method types and several currencies, this server
    // endpoint accepts both the payment method type and the currency as
    // parameters.
    //
    // Some example payment method types include `card`, `ideal`, and `alipay`.
    const params = {
      payment_method_types: [paymentMethodType],
      amount: 1999,
      currency: currency,
    }

    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.
    if (paymentMethodType === 'acss_debit') {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
      }
    } else if (paymentMethodType === 'konbini') {
      /**
       * Default value of the payment_method_options
       */
      params.payment_method_options = {
        konbini: {
          product_description: 'Tシャツ',
          expires_after_days: 3,
        },
      }
    } else if (paymentMethodType === 'customer_balance') {
      params.payment_method_data = {
        type: 'customer_balance',
      }
      params.confirm = true
      params.customer = req.body.customerId || await stripe.customers.create().then(data => data.id)
    }

    /**
     * If API given this data, we can overwride it
     */
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions
    }

    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    try {
      const paymentIntent = await stripe.paymentIntents.create(params);

      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  },

  stripeConfig: async (req, res) => {
    res.send({
      publishableKey: "pk_test_51KwqvXDAJzKbyS5ljo2p2oBNwF3HHi1Xi5sD1dqdXY1lPsABTzHQaCsH6Lsys2b94LLOVYWlEUG2mfO6kTdYL0Be00wqxueWi5",
    });
  }
};
