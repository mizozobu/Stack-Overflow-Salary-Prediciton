const getProtocol = req => {
  return req.protocol;
};

const getHost = req => {
  return req.get('host');
};

const getPath = req => {
  return req.originalUrl;
};

const getFullURL = req => {
  return `${getProtocol(req)}://${getHost(req)}${getPath(req)}`;
};

module.exports = {
  protocol: getProtocol,
  host: getHost,
  path: getPath,
  fullURL: getFullURL,
};

