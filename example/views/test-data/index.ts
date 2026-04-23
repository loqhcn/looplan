import { useModelSpace, ModelSpace } from '@/index';


const mainSpace = new ModelSpace({
    url: 'http://localhost:9000',
    provideToken: () => {
        return localStorage.getItem('token') || '';
    },

});

const dataSpace = new ModelSpace({
    url: 'http://localhost:9002',
    provideToken: async () => {
        return localStorage.getItem('dataToken') || '';
    },
    retry: true
});

async function getToken() {
    const AuthObj = mainSpace.useCloudObject('Auth');
    // 加载用户token
    const dataTokenRet = await AuthObj.testSign({
        userId: 1
    });
    // 设置token
    if (dataTokenRet?.data?.token) {
        localStorage.setItem('dataToken', dataTokenRet.data.token);
    }
}

const newsModel = dataSpace.useModel('main/sl_test_news');

export {
    mainSpace,
    dataSpace,
    newsModel,
    getToken
};