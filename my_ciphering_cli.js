const arrArguments = process.argv.slice(2);
const validationArguments = require('./src/validation/index');
const streamsPoolingPattern = require('./src/streams-pooling-pattern/streams-pooling-pattern');
const pipeline = require('./src/pipeline/pipeline');
const errorHandler = require('./src/errors/error-handler');
const searchConfig = require('./src/search-arguments/search-config');


const startValidation = (arrArguments) => {
  try {
    validationArguments.validationRepeatedArguments(arrArguments); 
    validationArguments.validationConfig(searchConfig(arrArguments));
    if(arrArguments.indexOf('-i') + 1 || arrArguments.indexOf('--input') + 1) validationArguments.validationInput(arrArguments);
    if(arrArguments.indexOf('-o') + 1 || arrArguments.indexOf('--output') + 1) validationArguments.validationOutput(arrArguments);
    const pipelineArguments = streamsPoolingPattern(searchConfig(arrArguments)); 
    pipeline.pipeStreams(pipelineArguments);     
  } catch (err) {
    errorHandler(err);
  }
};

startValidation(arrArguments);


module.exports = startValidation;