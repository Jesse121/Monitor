CREATE TABLE IF NOT EXISTS `monitor`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `readyStart` INT(200) NOT NULL COMMENT '准备新页面时间耗时',
    `redirectTime` INT(200) NOT NULL COMMENT '重定向耗时',
    `appcacheTime` INT(200) NOT NULL COMMENT 'DNS缓存耗时',
    `lookupDomainTime` INT(200) NOT NULL COMMENT 'DNS查询耗时',
    `connectTime` INT(200) NOT NULL COMMENT 'TCP连接耗时',
    `ttfbTime` INT(200) NOT NULL COMMENT '读取页面第一个字节耗时',
    `loadResources` INT(200) NOT NULL COMMENT '加载资源耗时',
    `domReadyTime` INT(200) NOT NULL COMMENT '解析DOM树耗时',
    `loadEventTime` INT(200) NOT NULL COMMENT 'load事件耗时',
    `loadPageTime` INT(200) NOT NULL COMMENT '页面加载总耗时'
)ENGINE=INNODB CHARSET=UTF8;     
