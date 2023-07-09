import request from "./request.js";

export const getList = function () {
  return request.get("/api/list");
};
export const addListItem = function (data) {
  return request.post("/api/addListItem", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const removeListItem = function (id) {
  return request.post(
    "/api/removeListItem",
    { id },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

export const changeCheck = function (id, done) {
  console.log("id, done", id, done);
  return request.post(
    "/api/changeItemCheck",
    { id, done },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};
