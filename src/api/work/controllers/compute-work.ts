import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  calculateDuration,
  calculateIncome,
  calculateOvertimeIncome,
  isOutOfSettingTimeRange,
} from "./utils/calculate-timesheet";
dayjs.extend(customParseFormat);

export default ({ strapi }) => ({
  async index(ctx) {
    const { query } = ctx;
    const userId = ctx.state.user.id;
    const id = query.filters.employee["$eq"];
    const filters = query.filters;
    const params = {
      ...query,
      filters: {
        ...filters,
        employee: {
          id: {
            $eq: id || userId,
          },
        },
      },
    };

    const work = await strapi.entityService.findMany("api::work.work", params);

    return work;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const work = await strapi.entityService.findOne("api::work.work", id, {
      populate: ["employee", "project", "setting"],
    });
    return work;
  },
  async create(ctx) {
    const { query } = ctx;
    const { body } = ctx.request;
    const request = body.data;

    const setting = await strapi.entityService.findOne(
      "api::work-time.work-time",
      1
    );

    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      request.employee
    );

    //format setting to dayjs
    const settingStartTime = dayjs(setting.startTime, "HH:mm:ss.SSS");
    const settingEndTime = dayjs(setting.endTime, "HH:mm:ss.SSS");
    const settingDuration = calculateDuration(settingStartTime, settingEndTime);

    //format request dateTime to HH:mm string to get start and end time
    const startDate = dayjs(request.startDate);
    const endDate = dayjs(request.endDate);

    //get total duration in miliseconds
    const totalDuration = calculateDuration(startDate, endDate);

    //get base duration
    let baseDuration = totalDuration;

    //get duration overtime duration
    let overtimeDuration = 0;

    //comment it first, still buggy and didnt need it right now
    // const isOutOfSettingTimeRangeResult = isOutOfSettingTimeRange(
    //   startDate,
    //   endDate,
    //   settingStartTime,
    //   settingEndTime
    // );

    //check if total duration is greater than setting duration and update overTimeDuration
    if (totalDuration > settingDuration) {
      baseDuration = settingDuration;
      overtimeDuration = totalDuration - settingDuration;
    }

    //check if total duration is less than setting duration and update baseDuration
    if (totalDuration < settingDuration) {
      baseDuration = totalDuration;
    }

    //get employee rate
    const employeeRate = user.rate;

    //get current setting overtime rate
    const overtimeRate = setting.overtimeRate;

    //calculate base income
    const baseIncome = calculateIncome(employeeRate, baseDuration);

    //calculate overtime income
    const overtimeIncome = calculateOvertimeIncome(
      employeeRate,
      overtimeDuration,
      overtimeRate
    );

    //total income
    const totalIncome = baseIncome + overtimeIncome;

    // create work to collection
    const work = await strapi.entityService.create("api::work.work", {
      data: {
        ...request,
        setting,
        baseDuration,
        baseIncome,
        overtimeDuration,
        overtimeIncome,
        totalDuration,
        totalIncome,
        employeeRate,
      },
    });

    return work;
  },
  async update(ctx) {
    const { query } = ctx;
    const { body } = ctx.request;
    const request = body.data;
    const id = ctx.params.id;

    const setting = await strapi.entityService.findOne(
      "api::work-time.work-time",
      1
    );

    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      request.employee
    );

    const initialData = await strapi.entityService.findOne(
      "api::work.work",
      id
    );

    //format setting to dayjs
    const settingStartTime = dayjs(setting.startTime, "HH:mm:ss.SSS");
    const settingEndTime = dayjs(setting.endTime, "HH:mm:ss.SSS");
    const settingDuration = calculateDuration(settingStartTime, settingEndTime);

    //format request dateTime to HH:mm string to get start and end time
    const startDate = dayjs(request.startDate || initialData.startDate);
    const endDate = dayjs(request.endDate || initialData.endDate);

    //get total duration in miliseconds
    const totalDuration = calculateDuration(startDate, endDate);

    //get base duration
    let baseDuration = totalDuration;

    //get duration overtime duration
    let overtimeDuration = 0;

    //comment it first, still buggy and didnt need it right now
    // const isOutOfSettingTimeRangeResult = isOutOfSettingTimeRange(
    //   startDate,
    //   endDate,
    //   settingStartTime,
    //   settingEndTime
    // );

    //check if total duration is greater than setting duration and update overTimeDuration
    if (totalDuration > settingDuration) {
      baseDuration = settingDuration;
      overtimeDuration = totalDuration - settingDuration;
    }

    //check if total duration is less than setting duration and update baseDuration
    if (totalDuration < settingDuration) {
      baseDuration = totalDuration;
    }

    //get employee rate
    const employeeRate = user.rate;

    //get current setting overtime rate
    const overtimeRate = setting.overtimeRate;

    //calculate base income
    const baseIncome = calculateIncome(employeeRate, baseDuration);

    //calculate overtime income
    const overtimeIncome = calculateOvertimeIncome(
      employeeRate,
      overtimeDuration,
      overtimeRate
    );

    //total income
    const totalIncome = baseIncome + overtimeIncome;

    // create work to collection
    const work = await strapi.entityService.update("api::work.work", id, {
      data: {
        ...request,
        setting,
        baseDuration,
        baseIncome,
        overtimeDuration,
        overtimeIncome,
        totalDuration,
        totalIncome,
        employeeRate,
      },
    });

    return work;
  },
});
