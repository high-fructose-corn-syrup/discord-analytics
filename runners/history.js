const { mkdir, access } = require(`fs/promises`)
const { writeFileSync, existsSync, readFileSync, appendFileSync, unlinkSync } = require(`fs`)
const { LiteClient } = require(`../modules/discord/index.js`)

const yield = ms => new Promise(r => setTimeout(r, ms))

const PATH = `${__dirname}/../`

async function exhaust_history(agent, parameters) {
    const search_parameters = { ...parameters }

    const channel_id = search_parameters.channel_id
    delete search_parameters.channel_id

    let messages = []

    console.log(parameters)

    do {
        const [ search_status, search_results ] = await agent.messages(channel_id, search_parameters)

        console.log(`SEARCH STATUS -- ${search_status}`)

        if (search_status == `OK`) {
            for (const message of search_results) {
                if (!existsSync(`${PATH}/logs/master.csv`)) {
                    writeFileSync(`${PATH}/logs/master.csv`, `message_snowflake,author_snowflake\n`)
                }
                appendFileSync(`${PATH}/logs/master.csv`, `${message.id},${message.author.id}\n`)
                console.log(message.content)
            }

            messages = search_results
            search_parameters.before = search_results[search_results.length - 1].id
        } else if (search_status == `TIMEOUT`) {
            console.log(`SEARCH TIMEOUT -- ${search_results.retry_after * 1000 + 50} ms`)
            await yield(search_results.retry_after * 1000 + 50)
        } else {
            // unhandled error

            console.log(`UNHANDLED ERROR -- ${search_status}`)
        }
    } while (messages.length > 0)
}


access(`${PATH}/logs`)
	.catch(() => mkdir(`${PATH}/logs`))

const [ , , key_file, ...queries ] = process.argv
const search_parameters = {}
for (const query of queries) {
    const [ name, value ] = query.split(`=`)
    search_parameters[name] = value
}

if (existsSync(`${PATH}/logs/master.csv`)) {
    unlinkSync(`${PATH}/logs/master.csv`)
}
const client = new LiteClient(readFileSync(`${PATH}/${key_file}`).toString())

exhaust_history(client, search_parameters)

//https://canary.discord.com/api/v9/channels/CHANNEL_ID/messages?before=BEFORE_ID&limit=LIMIT
// ex: node runners/history "channel_id=CHANNEL_ID"

//https://canary.discord.com/api/v9/channels/CHANNEL_ID/messages?before=BEFORE_ID&limit=LIMIT
// ex: node runners/history "channel_id=CHANNEL_ID"
