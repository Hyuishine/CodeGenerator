<!--
 * @Author: 黄宇/Hyuishine
 * @Date: 2021-07-28 10:33:22
 * @LastEditors: 黄宇/Hyuishine
 * @LastEditTime: 2021-07-28 10:34:16
 * @Description: 
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->

# 导出的SQL示例 #

```SQL

drop table if exists d_device_info;

/*==============================================================*/
/* Table: d_device_info                                         */
/*==============================================================*/
create table d_device_info
(
   id                   varchar(64) not null comment '主键',
   device_type          varchar(64) comment '设备类型',
   name                 varchar(64) comment '名称',
   d_id                 varchar(64) comment '设备内部id',
   g_id                 varchar(64) comment '监控主机编码',
   number               varchar(32) comment '编码',
   threshold            varchar(32) comment '阈值',
   range                varchar(32) comment '量程',
   state                varchar(64) comment '状态',
   net_date             time comment '联网时间',
   value                varchar(64) comment '实时值',
   number_alarm         int comment '告警次数',
   api                  varchar(250) comment '接口地址（监控链接）',
   address              varchar(500) comment '安装位置',
   "latitude_longitude" varchar(64) comment '经纬度',
   sort                 int comment '排序',
   create_date          datetime comment '创建时间',
   create_by            varchar(64) comment '创建人',
   update_date          datetime comment '修改时间',
   update_by            varchar(64) comment '修改人',
   del_flag             char(1) not null comment '删除标识',
   primary key (id)
);

alter table d_device_info comment '设备信息';

alter table d_device_info add constraint FK_Reference_22 foreign key (id)
      references d_company_info (id) on delete restrict on update restrict;

```