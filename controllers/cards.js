const httpConstants = require('http2').constants;
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(httpConstants.HTTP_STATUS_CREATED).send(card))
    .catch((e) => {
      console.log('e =>', e.name);
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(e);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      } else {
        res.send(card);
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(e);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      } else {
        res.send(card);
      }
    })
    .catch((e) => {
      console.log('e =>', e.name);
      if (e.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(e);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      } else {
        res.send(card);
      }
    })
    .catch((e) => {
      console.log('e =>', e.name);
      if (e.name === 'CastError') {
        next(new BadRequestError('Некорректный ID карточки'));
      } else {
        next(e);
      }
    });
};
