import {Router} from 'express'
import {excelToJson} from '../controller/excel-to-json';
import {addNeedTrack} from '../redis/track'
import TrackNumber from '../model/track_number';
import TrackTag from '../model/track_tag';
const router = Router();
// 上传 excel
router.post('/upload/track/excel', async function (req, res, next) {
    const tracking_json = excelToJson(req.body);
    res.send({status: 'success', msg: tracking_json.msg});
    const trackTag = await TrackTag.create({
        type:1,
        value:req.body.name
    });
    const trackTagId = trackTag.id;
    if (tracking_json.status === 1) {
        let result = tracking_json.data;
        for(let i =0; i < result.length; i++){
            let item = result[i];
            if (item.tracking !== 'undefined' && item.identify !== undefined) {
                await TrackNumber.create({
                    from_tag:trackTagId,
                    track:item.tracking,
                    channel:item.identify
                });
                await addNeedTrack(item.tracking);
            }
        }
    }
});
// 上传JSON
router.post('/upload/track/json', async function (req, res) {
        let json= excelToJson(req.body,'json');
        res.send({message: 'success'});
        const trackTag = await TrackTag.create({
            type:1,
            value:req.body.name
        });
        const trackTagId = trackTag.id;
        for (let i =0;i<json.length;i++){
            json[i].from_tag=trackTagId;
            await TrackNumber.create(json[i]);
        }
});

// 返回 excel 名称 erp  json的名称
router.get('/track/excel-list', async function(req, res){
    const excels = await TrackTag.findAll({type:1});
    res.send(excels);
});

// erp  推送过来的数据
router.post('/api/erp', async function(req, res){
    let erp=req.body;
    let item={
        track:erp.tracking,     //追踪单号
        channel :erp.identify,  //平台
        is_online:false,        // 默认false
        is_succ:false,          // 默认false

        from_tag:0,              //其他是对应 exls的
        stime:erp.startTime,    // 开始上网抓取时间
        ptime:erp.onlineEndTime,    //上网截止时间
        etime:erp.deliveredEndTime,// deliveredEndTime  //妥投截止时间
        //code  物流code
    };
    if (item.track !== 'undefined' && item.channel !== undefined&& !(await is_exist(item))) {
        await TrackNumber.create(item);
        res.json({message:"ok"})
    }else {
        // res.sendStatus(204)
        res.json({message: '追踪单号与平台必填'})
    }

});
async function is_exist(track) {
    return await TrackNumber.findOne({where:{track}})
}
export default router
