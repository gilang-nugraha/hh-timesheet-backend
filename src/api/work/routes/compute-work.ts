export default {
  routes: [
    {
      method: "GET",
      path: "/timesheet",
      handler: "compute-work.index",
    },
    {
      method: "GET",
      path: "/timesheet/:id",
      handler: "compute-work.findOne",
    },
    {
      method: "POST",
      path: "/timesheet",
      handler: "compute-work.create",
    },
    {
      method: "PUT",
      path: "/timesheet/:id",
      handler: "compute-work.update",
    },
  ],
};
