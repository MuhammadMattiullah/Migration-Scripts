import { getSites, createAccountsRecord, createSitesRecord,createSchema, getDeviceAssets,
     getSpecificationCapibilities, createThingsRecord, getSocialAccounts, 
     createSocialAccounts, getCapibilities, createCapibilities, getEvents,createEvents,
     getFactsBike,getFactsDaily,getFactsHourly,getFactsMonthly,getFactsQuaterly,getFactsWeekly,getTimeDimension,
     createFactsBike,createFactsDaily,createFactsHourly,createFactsMonthly,createFactsQuaterly,createFactsWeekly,createTimeDimension
     } 
     from './functions';
import async from 'async';
const { base64encode, base64decode } = require('nodejs-base64');
var mongoose = require('mongoose');
mongoose.connect('mongodb://35.159.19.24:38128/Mevris-IoT4992'); //Connect to your running mongod instance using the database named 'test'.
var db = mongoose.connection;
var data: any = [];
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function () {
    //The code in this asynchronous callback block is executed after connecting to MongoDB. 
    console.log('Successfully connected to MongoDB.');
});
var Schema = mongoose.Schema;

var accSchema = new Schema({
    _id: String,
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    imageUrl: String
}, { collection: 'Account' });

var Acc = mongoose.model('Account', accSchema);

function getRecords(numbers: any): any {
    return new Promise((resolve, reject) => {
        Acc.find().skip(Number(numbers * 10)).limit(10).then((res: any) => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                data.push(res[i])
            }
            resolve(data);
            data = [];

        })
    })
}
async function getAccountsData() {

    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1, 2, 3];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getRecords(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['firstName'] = record.firstName || "";
            obj['lastName'] = record.lastName || "";
            obj['email'] = record.email || "";
            obj['phoneNumber'] = record.phoneNumber || "";
            obj['avatar'] = record.imageUrl || "https://s3.amazonaws.com/mevris-image-cdn/default-profile-avatar.png";
            obj['password'] = record.password || "";
            obj['metadata'] = {},
                obj['state'] = {},
                obj['stateMeta'] = {}
            await createAccountsRecord(obj);
            cb();    
        }, (res): any => {
            callback();
        })
    })
}


async function getSocialAcc() {

    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1, 2, 3];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getSocialAccounts(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['provider'] = record.provider;
            obj['socialId'] = record.socialId;
            obj['isDeleted'] = false;
            obj['person'] = record.accountId;
            obj['profile'] = record.profile || {};
            await createSocialAccounts(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}


async function eventsData() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getEvents(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['type'] = record.type;
            obj['data'] = record.data;
            obj['time'] = record.time;
            obj['thing'] = record.assetId;
            obj['person'] = record.sourceAccountId || "5aec657a7f17066d4e804319";
            obj['isDeleted'] = false;
            obj['meta'] = record.meta || {};
            await createEvents(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}



async function capibilities() {

    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1, 2, 3, 4, 5];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getCapibilities(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['name'] = record.name;
            obj['slug'] = record.namespace;
            obj['description'] = "";
            obj['status'] = "";
            obj['commands'] = record.commands;
            obj['UI'] = {};
            obj['isDeleted'] = false;
            obj['states'] = record.states;
            await createCapibilities(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}



async function getSitesData() {
    const schemaHome = "58ee337455e4de7719499f6d";
    const schemaWork = "59043b29fd45309cd9ee4b81";
    const types: any = {
        "58ee337455e4de7719499f6d": schemaWork,
        "59043b29fd45309cd9ee4b81": schemaHome
    }
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getSites(ite);

        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            let ownerIds = "";
            if (record.ownerId[(record.ownerId.length - 1)] === "=") {
                let decoded = base64decode(record.ownerId);
                ownerIds = String(decoded).slice(8, String(decoded).length);
            } else {
                ownerIds = record.ownerId;
            }
            obj['id'] = record.id;
            obj['name'] = record.name || "";
            obj['active'] = record.active;
            obj['avatar'] = record.image;
            obj['owner'] = ownerIds;
            obj['schema'] = types[record.siteTypeId];
            obj['isDeleted'] = record.isDeleted || false;
            await createSitesRecord(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

async function getDevicesandAssetsData() {
    const specificationtypes: any = {
        "58ee37c455e4de7719499f72": "58ee37c455e4de7719499f72",
        "59352dd63f08f73738013677": "59352dd63f08f73738013677",
        "59352dd63f08f73738013678": "59352dd63f08f73738013678",
        "59352dd63f08f73738013679": "59352dd63f08f73738013679",
        "5b42e8d65923156e400b1e62": "5b42e8d65923156e400b1e62",
        "5b42e8d65923156e400b1e63": "5b42e8d65923156e400b1e63",
        "5b42e8d65923156e400b1e64": "5b42e8d65923156e400b1e64",
        "5b42e8d75923156e400b1e65": "5b42e8d75923156e400b1e65",
        "5b42e8d75923156e400b1e66": "5b42e8d75923156e400b1e66",
        "5bc88018b854cb4512b38d96": "5bc88018b854cb4512b38d96",
        "5bc88018b854cb4512b38d97": "5bc88018b854cb4512b38d97",
        "5c4705037534e260f3b2bcc2": "5c4705037534e260f3b2bcc2",
        "5c513d06d822b07c723bc092": "5c513d06d822b07c723bc092",
        "5c513d06d822b07c723bc093": "5c513d06d822b07c723bc093",
        "5c513d06d822b07c723bc094": "5c513d06d822b07c723bc094",
        "5cb07274a6258927f607c9b1": "5cb07274a6258927f607c9b1"
    };
    const arr = [0, 1, 2];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getDeviceAssets(ite);
        async.eachLimit(rec, 100, async (thing: any, cb) => {
            var obj: any = {};
            obj['name'] = "",
                obj['avatar'] = "https://s3-us-west-2.amazonaws.com/bluerainimages/ac.png",
                obj['meta'] = thing.meta,
                obj['isDeleted'] = false,
                obj['state'] = "",
                obj['place'] = "",
                obj['schema'] = "",
                obj['owner'] = "",
                obj['stateMeta'] = {},
                obj['place'] = "5904513184f267624ea45701"
            if (thing.asset) {
                obj['name'] = thing.asset.name;
                obj['isDeleted'] = thing.asset.deleted;
                obj['state'] = thing.asset.state,
                    obj['place'] = thing.asset.siteId,
                    obj['schema'] = specificationtypes[thing.asset.specificationId],
                    obj['owner'] = thing.asset.ownerId
            }
            await createThingsRecord(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

function capilitiesloop(rec: any): any {
    return new Promise((resolve, reject) => {
        let capabilities: any = [];
        let i: any;
        for (i in rec) {
            const record = rec[i];
            capabilities.push({
                'capabilityId': record.capabilityId,
                'orderId': record.orderId,
                'namespace': record.namespace
            })
        }
        resolve(capabilities);
    })

}


async function schemaRecords() {
    const specificationtypes: any = {
        "58ee37c455e4de7719499f72": "58ee37c455e4de7719499f72",
        "59352dd63f08f73738013677": "59352dd63f08f73738013677",
        "59352dd63f08f73738013678": "59352dd63f08f73738013678",
        "59352dd63f08f73738013679": "59352dd63f08f73738013679",
        "5b42e8d65923156e400b1e62": "5b42e8d65923156e400b1e62",
        "5b42e8d65923156e400b1e63": "5b42e8d65923156e400b1e63",
        "5b42e8d65923156e400b1e64": "5b42e8d65923156e400b1e64",
        "5b42e8d75923156e400b1e65": "5b42e8d75923156e400b1e65",
        "5b42e8d75923156e400b1e66": "5b42e8d75923156e400b1e66",
        "5bc88018b854cb4512b38d96": "5bc88018b854cb4512b38d96",
        "5bc88018b854cb4512b38d97": "5bc88018b854cb4512b38d97",
        "5c4705037534e260f3b2bcc2": "5c4705037534e260f3b2bcc2",
        "5c513d06d822b07c723bc092": "5c513d06d822b07c723bc092",
        "5c513d06d822b07c723bc093": "5c513d06d822b07c723bc093",
        "5c513d06d822b07c723bc094": "5c513d06d822b07c723bc094",
        "5cb07274a6258927f607c9b1": "5cb07274a6258927f607c9b1"
    };

    const typedata = '5cb97da509fcbc6cd2942fc5';
    const productData = "5cb9a86822b33b02ccc085aa";

    async.eachSeries(specificationtypes, async (ite, callback) => {
        const rec = await getSpecificationCapibilities(ite);
        const capabilities = await capilitiesloop(rec);
        var obj: any = {};
        obj['capabilities'] = capabilities,
        obj['type'] = typedata,
        obj['product'] = productData,
        await createSchema(obj);
        callback();
    })
}


async function factsdaily() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getFactsDaily(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['calculationUnit'] = record.calculationUnit;
            obj['facts'] = record.facts;
            obj['timeKey'] = record.timeKey;
            obj['thing'] = record.assetId;
            obj['timeDimensionId'] = record.timeDimensionId || {};
            await createFactsDaily(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

async function factsweekly() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getFactsWeekly(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['calculationUnit'] = record.calculationUnit;
            obj['facts'] = record.facts;
            obj['timeKey'] = record.timeKey;
            obj['thing'] = record.assetId;
            obj['timeDimensionId'] = record.timeDimensionId || {};
            await createFactsWeekly(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

async function factsmonthly() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getFactsMonthly(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['calculationUnit'] = record.calculationUnit;
            obj['facts'] = record.facts;
            obj['timeKey'] = record.timeKey;
            obj['thing'] = record.assetId;
            obj['timeDimensionId'] = record.timeDimensionId || {};
            await createFactsMonthly(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

async function factshourly() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getFactsHourly(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['calculationUnit'] = record.calculationUnit;
            obj['facts'] = record.facts;
            obj['timeKey'] = record.timeKey;
            obj['thing'] = record.assetId;
            obj['timeDimensionId'] = record.timeDimensionId || {};
            await createFactsHourly(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

async function factsquaterly() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getFactsQuaterly(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['calculationUnit'] = record.calculationUnit;
            obj['facts'] = record.facts;
            obj['timeKey'] = record.timeKey;
            obj['thing'] = record.assetId;
            obj['timeDimensionId'] = record.timeDimensionId || {};
            await createFactsQuaterly(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

async function factsbike() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getFactsBike(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['calculationUnit'] = record.calculationUnit;
            obj['facts'] = record.facts;
            obj['timeKey'] = record.timeKey;
            obj['thing'] = record.assetId;
            await createFactsBike(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}


async function timeDimension() {
    // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    const arr = [0, 1];
    async.eachSeries(arr, async (ite, callback) => {
        const rec = await getTimeDimension(ite);
        async.eachLimit(rec, 100, async (record: any, cb) => {
            var obj: any = {};
            obj['id'] = record.id;
            obj['timeKey'] = record.timeKey;
            obj['hour'] = record.hour;
            obj['calendarDate'] = record.calendarDate;
            obj['dayOfWeek'] = record.dayOfWeek;
            obj['dayOfMonth'] = record.dayOfMonth ;
            obj['dayOfYear'] = record.dayOfYear;
            obj['weekOfYear'] = record.weekOfYear;
            obj['monthOfYear'] = record.monthOfYear ;
            obj['quarterOfYear'] = record.quarterOfYear;
            obj['year'] = record.year;
            await createTimeDimension(obj);
            cb();
        }, (res): any => {
            callback();
        })
    })
}

function main(): Promise<void> {
    return new Promise(async (resolve, reject) => {
        // await getAccountsData();
        // await getSitesData();
        // await getDevicesandAssetsData();
        // await getSocialAcc();
        // await capibilities();
        // await schemaRecords();
        //await eventsData();
    })

}

main()