import{_ as m}from"./women-ry4j0osf.js";import{r as i,c as l,h as f,f as s,i as r,m as d,F as _,q as g,x as v,y,z as k,b as a,J as x,s as w,j as V,_ as b}from"./index-jvsXQBcr.js";const B={key:0,class:"loader"},C=s("span",null,null,-1),N=s("span",null,null,-1),D=[C,N],$={class:"back-links"},q=s("i",{class:"iconly-Arrow-Left icli"},null,-1),E=s("div",{class:"content"},[s("h2",null,"Vendors")],-1),F=v('<div class="header-option"><ul><li><a href="wishlist.html"><i class="iconly-Heart icli"></i></a></li><li><a href="cart.html"><i class="iconly-Buy icli"></i></a></li></ul></div>',1),L={class:"category-listing px-15 lg-space top-space pt-0"},P={class:"content-part"},S=["src"],j=s("div",{class:"img-part"},[s("img",{src:m,class:"img-fluid",alt:""})],-1),G={__name:"VendorsPage",setup(z){const u=y(),{$axios:h,$uploads:p}=u.appContext.config.globalProperties,n=i([]),o=i(!0);return(async()=>{try{const t=await h.get("vendors");n.value=t.data.vendors.data,console.log(t.data),o.value=!1}catch(t){console.error("Error fetching data:",t),o.value=!1}})(),(t,H)=>{const c=k("router-link");return a(),l(_,null,[o.value?(a(),l("div",B,D)):f("",!0),s("header",null,[s("div",$,[r(c,{to:{name:"home"}},{default:d(()=>[q,E]),_:1})]),F]),s("section",L,[(a(!0),l(_,null,g(n.value,e=>(a(),x(c,{to:{name:"shop",query:{vendor:e.id}},class:"category-wrap",key:e.id},{default:d(()=>[s("div",P,[s("img",{src:w(p)+e.banner,style:{"border-radius":"50%",height:"80px",width:"80px"},class:"img-fluid",alt:""},null,8,S),s("h4",null,V(e.shop_name),1)]),j]),_:2},1032,["to"]))),128))]),r(b)],64)}}};export{G as default};
