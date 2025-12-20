const getIndex = async (req, res) => {
  try {
    req.session.views = (req.session.views ?? 0) + 1;

    res.render('index', {
      title: 'Home Page',
      views: req.session.views,
    });
  } catch (error) {
    console.error('Error fetching index data:', error);
  }
}

module.exports = {
  getIndex,
}