import inquirer from "inquirer";

function askTwitterCredentials() {
    const questions = [];
}

function getDataByParameterTwitter(params) {
    const questions = [
        {
            name: 'api_key',
            type: 'input',
            message: 'Enter the api_key!',
            validate: (api_key) => api_key.length ?  true : 'enter the api_key¡'
        },
        {
            name: 'api_secret',
            type: 'input',
            message: 'Enter the api_secret!',
            validate: (api_secret) => api_secret.length ?  true : 'enter the api_secret¡'
        },
        {
            name: 'hashtag',
            type: 'input',
            message: 'Enter the hashtag to search!',
            validate: (hashtag) => `The hashtag is: ${hashtag}` ?  true : 'Not ingress hashtag'
        },
        {
            name: 'mention',
            type: 'input',
            message: 'Enter the mention user to search!',
            validate: (mention) => `The mention is: ${mention}` ?  true : 'Not ingress user'
        },
        {
            name: 'location',
            type: 'input',
            message: 'Enter the location to search!',
            validate: (location) => `The location is: ${location}` ?  true : 'Not ingress location'
        },
    ];
    return inquirer.prompt(questions);
}

export { getDataByParameterTwitter } ;