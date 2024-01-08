// Akash Dilwale _ Simple CSV O/P code 
// Initial variables and columns for the CSV report
let log;
const logs = [];
const columns = [
  'iteration',
  'collectionName',
  'requestName',
  'testCaseName',
  'url',
  'status',
  'code',
  'responseTime',
  'result', // New column for pass/fail result
  'assertionErrorMessage' // New column for assertion error message
];

// CSV object for stringifying
const CSV = {
  stringify: (str) => {
    return `"${str.replace(/"/g, '""')}"`
  }
};

/**
 * Newman CSV Reporter
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} options - A set of collection run options.
 * @param {String} options.export - The path to which the summary object must be written.
 * @param {String} options.includeBody - Whether the response body should be included in each row.
 * @returns {*}
 */
module.exports = function newmanCSVReporter (newman, options) {

  // Conditionally add 'body' column if includeBody option is set
  if (options.includeBody) {
    columns.push('body')
  }

  // Event triggered before each item in the collection
  newman.on('beforeItem', (err, e) => {
    if (err) return;

    // Initialize log object for each item
    log = {};
    log.testCaseName = ''; // Default empty string for testCaseName
  });

  // Event triggered before each request in the collection
  newman.on('beforeRequest', (err, e) => {
    if (err || !e.item.name) return;
    const { cursor, item, request } = e;
    
    // Assign request-related details to the log object
    Object.assign(log, {
      collectionName: newman.summary.collection.name,
      iteration: cursor.iteration + 1,
      requestName: item.name,
      url: request.url.toString(),
      status: '',
      code: '',
      responseTime: '',
      assertionErrorMessage:'',
    });
  
  });
  
  // Event triggered after each request in the collection
  newman.on('request', (err, e) => {
    if (err || !e.item.name) return;
    const { status, code, responseTime, stream } = e.response;
    Object.assign(log, { status, code, responseTime });

    // Include response body if requested
    if (options.includeBody) {
      Object.assign(log, { body: stream.toString() });
    }
  });

  // Event triggered after each assertion in the collection
  newman.on('assertion', (err, e) => {
    const { assertion } = e;

    // Create a new log entry for each assertion
    const assertionLog = { ...log };

    // Assign assertion-related details to the log
    assertionLog.testCaseName = assertion || '';

    // Adjustments for result count and error messages
    if (err) {
      assertionLog.result = 'Fail';
      assertionLog.assertionErrorMessage = err.message || 'Assertion failed';
    } else {
      assertionLog.result = 'Pass';
      assertionLog.assertionErrorMessage = '';
    }

    logs.push(assertionLog); // Add this assertion log to the array
  });
  
  // Event triggered before completing the collection run
  newman.on('beforeDone', (err, e) => {
    if (err) return;

    // Export the CSV report with results
    newman.exports.push({
      name: 'csv-reporter',
      default: 'newman-run-report.csv',
      path: options.export,
      content: getResults()
    });

    // Log a completion message
    console.log('Happy Reporting!\n'+'    Author\n'+'Akash Dilwale\n'+'QA RemoSys Tech Pune');
  });

  // Function to generate the CSV content based on collected logs
  function getResults () {
    const results = logs.map((log) => {
      const row = [];

      // Construct CSV rows from log data
      columns.forEach((key) => {
        const val = log[key];
        const rowValue = key === 'result' && val === undefined ? '' : (Array.isArray(val) ? val.join(', ') : String(val));

        row.push(CSV.stringify(rowValue));
      });

      return row.join(',');
    });

    // Include column headers and join all rows into a CSV string
    results.unshift(columns.map(column => CSV.stringify(column)).join(','));

    return results.join('\n');
  }
};
