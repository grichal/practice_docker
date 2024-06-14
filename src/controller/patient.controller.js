import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import query from "../query/patient.query.js";

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 200, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export const getPatients = (req, res) => {
  logger.info(`${req.method}, ${req.originalurl}, fetching patients`);
  database.query(query.SELECT_PATIENTS, (error, results) => {
    if (!results) {
        logger.info(error.message)
        res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code,HttpStatus.OK.status,"No Patients Found"));
    }else{
        res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code,HttpStatus.OK.status,"Patients retrieved",{patients: results}
          )
        );
    }
  });
};
export const createPatient = (req, res) => {
    logger.info(`${req.method}, ${req.originalurl}, creating patient`);
    database.query(query.CREATE_PATIENTS, Object.values(req.body), (error, results) => {
      if (!results) {
        logger.info(error.message)
        res.status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code,HttpStatus.INTERNAL_SERVER_ERROR.status,"Error occurred"
            )
          );
      }else{
        const patient = {id: results.insertedId, ...req,body, created_at: new Date()}
          res.status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.CREATED.code,HttpStatus.CREATED.status,"Patient created",{patient}
            )
          );
      }
    });
  };

export const getPatient = (req, res) => {
    logger.info(`${req.method}, ${req.originalurl}, fetching patient`);
    database.query(query.SELECT_PATIENT, [req.params.id],(error, results) => {
      if (!results[0]) {
        res.status(HttpStatus.NOT_FOUND.code)
          .send(new Response(HttpStatus.NOT_FOUND.code,HttpStatus.NOT_FOUND.status,`Patient by id ${req.params.id} not found`
            ));
      }else{
          res.status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.OK.code,HttpStatus.OK.status,"Patient retrieved",results[0]
            ));
        }
    });
  };

export default HttpStatus;
