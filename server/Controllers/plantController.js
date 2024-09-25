const plantController = {};

const apiKey = 'sk-IEvL66ee113fc7eab6928';

plantController.fetchSpecies = async (req, res, next) => {
  const { search } = req.query;
  const uriQuery = `https://perenual.com/api/species-list?key=${apiKey}&q=${search}`;
  try {
    const response = await fetch(uriQuery);
    const results = await response.json();
    res.locals.plants = results.data;
    return next();
  } catch (error) {
    return next({
      log: 'API error: ' + error,
      status: 502,
      message: 'Error fetching results.'
    });
  }
};

module.exports = plantController;
