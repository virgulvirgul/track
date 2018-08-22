import sequelize from '../mysql';
import Sequelize from 'sequelize';

const logistics = sequelize.define('logistics', {
    name:{ // 物流商名称
        type:Sequelize.DataTypes.STRING
    },
    code :{ //物流商 code
        type:Sequelize.DataTypes.STRING
    },
    create_time:{  // 时间
        type:Sequelize.DataTypes.DATE
    }
},{timestamps: false});

export default logistics;