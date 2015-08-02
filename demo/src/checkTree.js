/**
 * jQuery 复选框树
 *
 * @version  0.1
 * @author   xubin <xu.bin@zol.com.cn>
 * @date     2015 08 02 
 */

/**
 * <div>
 *  <一级标签><input data-id="{'fid':0}">
 *      <二级标签><input data-id="{'fid':0,'sid',2}">
 *          <三级标签><input data-id="{'fid':0,'sid',2,'tid':3}"></三级标签>
 *          <三级标签><input data-id="{'fid':0,'sid',2,'tid':4}"></三级标签>
 *      </二级标签>
 *  </一级标签>
 * </div>
 *
 * Usage:
 *
 * $('#XXXXX').checktree();
 *
 */
(function($){
    $.fn.extend({
        checktree:function(){
            
//            console.log(_this);
            // 标签初始化
            $(this).find("*").children('input').each(function(){
                var _this = $(this);
                var everyData = _this.data('id');
                    var everyFid = _this.data('id').fid,
                        everySid = everyData.sid,
                        everyTid = everyData.tid;
                // 一级菜单
                if (everyFid && (everySid == undefined) && (everyTid == undefined)){
                        _this.addClass('uni_f_k_' + everyFid);
                        _this.addClass('only_uni_k_' + everyFid);
                        _this.attr('uni_type',1);
                }
                // 一级菜单对应二级菜单
                if (everyFid && (everySid != undefined) && (everyTid == undefined)){
                        _this.addClass('uni_fl_k_' + everyFid);
                        _this.addClass('uni_fl_only_k_' + everyFid);
                        _this.addClass('uni_s_k_' + everySid);
                        _this.addClass('only_uni_k_' + everySid);
                        _this.attr('uni_type',2);
                }

                // 二级菜单对应三级菜单
                if (everyFid && (everySid != undefined) && (everyTid != undefined)){
                        _this.addClass('uni_fl_k_' + everyFid);
                        _this.addClass('uni_sl_k_' + everySid);
                        _this.addClass('only_uni_k_' + everyTid);
                        _this.attr('uni_type',3);

                }
            });
            // 点击事件
            $(this).find("*").children('input')
              .on('click',function(){
                    var curData = $(this).data('id'),
                    curFid = curData.fid,
                    curSid = curData.sid,
                    curTid = curData.tid;
                    var curState = ($(this).attr('checked') == 'checked') ? 1 : 0;
                    var uniType  = $(this).attr('uni_type');
            
                    switch(uniType){
                        case '1': // 一级菜单
                            if (curState){  
                                $(".uni_fl_k_" + curFid).attr('checked', true);
                            }else{
                                $(".uni_fl_k_" + curFid).attr('checked', false);
                            }
                            break;
                        case '2': // 二级菜单
                            if (curState){  
                                $(".uni_sl_k_" + curSid).attr('checked', true);
                                $(".only_uni_k_" + curFid).attr('checked', true);
                            }else{
                                $(".uni_sl_k_" + curSid).attr('checked', false);
                                var curSecLevel = 0;
                                $(".uni_fl_only_k_" + curFid).each(function(){
                                    if($(this).attr('checked')){
                                       curSecLevel ++; 
                                    }

                                });
                                if(curSecLevel == 0){
                                    $(".only_uni_k_" + curFid).attr('checked', false);
                                }
                            }
                            break;
                        case '3': // 三级菜单
                            if (curState){  
                                $(".only_uni_k_" + curSid).attr('checked', true);
                                $(".only_uni_k_" + curFid).attr('checked', true);
                                $(".only_uni_k_" + curSid).attr('checked', true);
                            }else{
                                var curThiLevel = 0;
                                $(".uni_sl_k_" + curSid).each(function(){
                                    if($(this).attr('checked')){
                                       curThiLevel ++; 
                                    }

                                });
                                if(curThiLevel == 0){
                                    $(".uni_s_k_" + curSid).attr('checked', false);
                                }                            
                                var curSecLevel = 0;
                                $(".uni_fl_only_k_" + curFid).each(function(){
                                if($(this).attr('checked')){
                                       curSecLevel ++; 
                                    }

                                });
                                if(curSecLevel == 0){
                                    $(".only_uni_k_" + curFid).attr('checked', false);
                                }
                            }
                            break;
                        default:
                            break;
                          
                    }
              });
        }
    });
})(jQuery);
