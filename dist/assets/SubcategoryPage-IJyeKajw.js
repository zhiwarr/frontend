import{_ as f}from"./women-ry4j0osf.js";import{_ as v,a as x,b}from"./skirts-UjfIJB1r.js";import{u as k,r as w,c as e,h as C,f as t,i as n,m as r,F as d,q as h,x as m,y as B,z as N,b as a,B as u,j as i}from"./index-jvsXQBcr.js";const V={key:0,class:"loader"},q=t("span",null,null,-1),D=t("span",null,null,-1),S=[q,D],F={class:"back-links"},j=t("i",{class:"iconly-Arrow-Left icli"},null,-1),A={class:"content"},E=t("i",{class:"iconly-Arrow-Right-2 icli"},null,-1),L=m('<div class="header-option"><ul><li><a href="wishlist.html"><i class="iconly-Heart icli"></i></a></li><li><a href="cart.html"><i class="iconly-Buy icli"></i></a></li></ul></div>',1),P={class:"category-listing px-15 xl-space top-space pt-0"},R={class:"content-part"},$=t("div",{class:"img-part"},[t("img",{src:f,class:"img-fluid",alt:""})],-1),z={class:"px-15 category-menu"},H={class:"accordion px-15"},I={class:"accordion-header d-flex justify-content-between align-items-center"},T=["data-bs-target"],G=["id"],J={class:"accordion-body"},K=m('<section class="inner-category px-15"><div class="row gx-3"><div class="col-4"><a href="shop.html"><img src="'+v+'" class="img-fluid" alt=""><h4>Flowerprint</h4></a></div><div class="col-4"><a href="shop.html"><img src="'+x+'" class="img-fluid" alt=""><h4>Denim</h4></a></div><div class="col-4"><a href="shop.html"><img src="'+b+'" class="img-fluid" alt=""><h4>Skirts</h4></a></div></div></section>',1),Z={__name:"SubcategoryPage",setup(M){const p=B(),{$axios:g}=p.appContext.config.globalProperties,y=k().params.category,o=w([]);return(async()=>{try{const c=await g.get(`categories/${y}`);o.value=c.data}catch(c){console.error("Error fetching data:",c)}})(),(c,U)=>{const l=N("router-link");return a(),e(d,null,[c.loading?(a(),e("div",V,S)):C("",!0),t("header",null,[t("div",F,[n(l,{to:{name:"categories"}},{default:r(()=>[j,t("div",A,[t("h2",null,[u(" Categories "),t("span",null,[E,u(i(o.value.name.en),1)])])])]),_:1})]),L]),t("section",P,[n(l,{to:{name:"shop",query:{category:o.value.slug}},class:"category-wrap"},{default:r(()=>[t("div",R,[t("h2",null,i(o.value.name.en),1),(a(!0),e(d,null,h(o.value.products,s=>(a(),e("h4",{key:s.id},i(s.name),1))),128))]),$]),_:1},8,["to"])]),t("section",z,[t("div",H,[(a(!0),e(d,null,h(o.value.subcategories,s=>(a(),e("div",{class:"accordion-item",key:s.id},[t("h2",I,[n(l,{class:"w-75",to:{name:"shop",query:{subcategory:s.slug}}},{default:r(()=>[u(i(s.name.en),1)]),_:2},1032,["to"]),t("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#"+s.id},null,8,T)]),t("div",{id:s.id,class:"accordion-collapse collapse"},[t("div",J,[t("ul",null,[(a(!0),e(d,null,h(s.child_categories,_=>(a(),e("li",{key:_.id},[n(l,{to:{name:"shop",query:{childcategory:_.slug}}},{default:r(()=>[u(i(_.name.en),1)]),_:2},1032,["to"])]))),128))])])],8,G)]))),128))])]),K],64)}}};export{Z as default};
