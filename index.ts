
//@ts-ignore - redis-promisify doesn't have types
import redis from 'redis-promisify';

console.log("connecting")
const client = redis.createClient(6379, "127.0.0.1");
console.log("connected")

async function main() {

    const x = await client.setexAsync("andrew", 99, new Date().toLocaleString());
    

    let output = await client.getAsync("andrew")
    console.log(output)

    output = await client.zaddAsync("mykey", 3, "junk1")
    output = await client.zaddAsync("mykey", 2, "junk2")
    output = await client.zaddAsync("mykey", 1, "junk3")
    
    const keys = await client.keysAsync("*");
    for (const key of keys) {
        const type = await client.typeAsync(key)
        const items = type=="zset" ? await client.zcardAsync(key) : null;
        console.log(`${key} (${type}) ${items}`)
    };
    //await sleep(1);

    // console.log('flushing')
    // await client.flushdbAsync();

  
    console.log('ending')
    client.quit()
    console.log('im done')
}

main();

