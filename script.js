/* 修改文案：编辑下方 slogans 数组。新增照片：先上传至 assets，再将路径加入 photos 数组。 */
const people = {
  gurui: {name:'谷睿', role:'特别鸣谢：本主页主角', photo:'./assets/gurui.jpeg', photos:['./assets/gurui.jpeg'], slogans:[
    '我是侯明宇，谷睿他爹。',
    '谷睿，先别急着说话——侯明宇的主场时间到了。',
    '谷睿专属频道现已开启，本频道由侯明宇友情冠名。',
    '谷睿负责闪亮登场，侯明宇负责气氛拉满。',
    '郑重声明：谷睿的快乐指数，已被侯明宇列入重点关注。'
  ]},
  xiongwenxuan: {name:'熊雯萱', role:'特别鸣谢：气氛担当', photo:'./assets/xiongwenxuan.jpeg', photos:['./assets/xiongwenxuan.jpeg'], slogans:[
    '我是侯明宇，熊雯萱的快乐气氛组组长。',
    '熊雯萱请注意：侯明宇已进入本主页，精彩即将开始。',
    '我叫侯明宇，今天也来给熊雯萱的日常加点戏。',
    '熊雯萱负责精彩，侯明宇负责把精彩写进档案。',
    '本主页友情播报：侯明宇已上线，请保持微笑。'
  ]},
  zhushun: {name:'朱舜', role:'特别鸣谢：名场面制造者', photo:'./assets/zhushun.jpeg', photos:['./assets/zhushun.jpeg'], slogans:[
    '我是侯明宇，朱舜的快乐监督员。',
    '朱舜，侯明宇来查收今日份名场面了。',
    '朱舜负责发挥，侯明宇负责专业点评。',
    '这里是朱舜主页，当前由侯明宇友情主持。',
    '友情提示：侯明宇一到场，普通日子也能变名场面。'
  ]}
};
const $=id=>document.getElementById(id);
const home=$('home'),profile=$('profile'),grid=$('peopleGrid'),mainPhoto=$('mainPhoto'),gallery=$('gallery');
let activeKey=null,sloganIndex=0,photoIndex=0;
function showToast(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),1800)}
function renderHome(){
  grid.innerHTML='';
  Object.entries(people).forEach(([key,p],i)=>{
    const card=document.createElement('button');card.className='person-card';card.type='button';
    const img=document.createElement('img');img.className='person-image';img.src=p.photo;img.alt=p.name;img.loading='lazy';
    img.onerror=()=>{const fallback=document.createElement('div');fallback.className='person-image-fallback';fallback.textContent=p.name[0];img.replaceWith(fallback)};
    const body=document.createElement('div');body.className='person-card-body';
    const over=document.createElement('span');over.className='person-overline';over.textContent=`PERSON 0${i+1} / DECLARATION`;
    const row=document.createElement('div');row.className='person-name-row';
    const name=document.createElement('strong');name.textContent=p.name;
    const arrow=document.createElement('span');arrow.className='person-arrow';arrow.textContent='↗';row.append(name,arrow);
    const desc=document.createElement('p');desc.textContent=p.role+' · 点击进入专属主页';
    const bottom=document.createElement('div');bottom.className='card-bottom';bottom.innerHTML='<span>宣言已准备就绪</span><b>进入主页 →</b>';
    body.append(over,row,desc,bottom);card.append(img,body);card.addEventListener('click',()=>openProfile(key));grid.append(card);
  });
}
function openProfile(key){
 activeKey=key;sloganIndex=0;photoIndex=0;
 home.classList.remove('active');profile.classList.add('active');
 renderProfile();window.scrollTo({top:0,behavior:'smooth'});
}
function renderProfile(){
 const p=people[activeKey];if(!p)return;
 $('profileHeading').textContent=p.name+' · 专属主页';
 $('profileSub').textContent='我是侯明宇。今天，也要认真地发表一点不太严肃的宣言。';
 $('profileNumber').textContent='PROFILE 0'+(Object.keys(people).indexOf(activeKey)+1);
 $('statement').textContent=p.slogans[sloganIndex];
 $('sloganIndex').textContent=`DECLARATION 0${sloganIndex+1} / 0${p.slogans.length}`;
 $('copyFeedback').textContent='';
 renderPhoto();
}
function renderPhoto(){
 const p=people[activeKey];if(!p)return;
 if(!p.photos.length)p.photos=[p.photo];
 photoIndex=((photoIndex%p.photos.length)+p.photos.length)%p.photos.length;
 mainPhoto.src=p.photos[photoIndex];mainPhoto.alt=people[activeKey].name+'主页照片';
 mainPhoto.onerror=()=>{mainPhoto.alt='照片加载失败：请核对 assets 文件名与路径';};
 $('photoIndex').textContent=`${String(photoIndex+1).padStart(2,'0')} / ${String(p.photos.length).padStart(2,'0')}`;
 gallery.innerHTML='';
 p.photos.forEach((src,i)=>{
  const b=document.createElement('button');b.className='gallery-item'+(i===photoIndex?' selected':'');b.type='button';b.setAttribute('aria-label',`查看第${i+1}张照片`);
  const im=document.createElement('img');im.src=src;im.alt=people[activeKey].name+'照片 '+(i+1);im.loading='lazy';
  im.onerror=()=>{b.style.display='none'};
  b.append(im);b.addEventListener('click',()=>{photoIndex=i;renderPhoto()});gallery.append(b);
 });
}
$('nextSlogan').addEventListener('click',()=>{const p=people[activeKey];sloganIndex=(sloganIndex+1)%p.slogans.length;renderProfile();$('statement').animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:250})});
$('photoNext').addEventListener('click',()=>{photoIndex++;renderPhoto()});
$('backHome').addEventListener('click',()=>{profile.classList.remove('active');home.classList.add('active');window.scrollTo({top:0,behavior:'smooth'})});
$('brandHome').addEventListener('click',e=>{if(profile.classList.contains('active')){e.preventDefault();$('backHome').click()}});
$('copySlogan').addEventListener('click',async()=>{const text=people[activeKey].slogans[sloganIndex];try{await navigator.clipboard.writeText(text);$('copyFeedback').textContent='已复制，可以去聊天框粘贴。'}catch(e){const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();$('copyFeedback').textContent=ok?'已复制，可以去聊天框粘贴。':'请长按宣言文字进行复制。'}});
renderHome();
