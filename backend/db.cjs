async function getRoutesById(routeId) {
  return routes.find((r) => r.id === routeId);
}
module.exports = { getRoutesById };
