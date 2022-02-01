import inquirer from "inquirer";

function askTwitterCredentials() {
    const questions = [];
}

function getDataByParameterTwitter(params) {
    const questions = [
        {
            name: 'hashtag',
            type: 'input',
            message: 'Enter the hashtag to search!',
            validate: (hashtag) => `The hashtag is: ${hashtag}` ?  true : 'Not ingress hashtag'
        },
        {
            name: 'mention',
            type: 'input',
            message: 'Enter the mentions separate by , user to search!',
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