import { message } from "antd";
import { useEffect } from "react";
import {
  useLocation,
  useRoutes,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import Cookies from 'js-cookie'

interface RouteObject {
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  auth?: boolean;
}

//递归查询对应的路由
export function searchroutedetail(
  path: string,
  routes: RouteObject[]
): RouteObject | null {
  for (let item of routes) {
    if (item.path === path) {
      return item
    }
    if (item.children) {
      if (searchroutedetail(path, item.children)) {
        return searchroutedetail(path, item.children);
      }
    }
  }
  return null;
}

//全局路由守卫
async function guard(
  location: Location,
  navigate: NavigateFunction,
  routes: RouteObject[]
) {
  const { pathname } = location;

  if(pathname === '/404' || pathname === '/login' || pathname === '/register'){
    return ;
  }
  if(pathname === '/product'){
    navigate("/product/list");
  }

  //找到对应的路由信息
  const routedetail = searchroutedetail(pathname, routes)


  //没有找到路由，跳转404
  if (!routedetail) {
    navigate("/404");
    return true;
  }

  //如果需要权限验证
  if (routedetail.auth) {
    const token = Cookies.get('token');
    if (!token) {
      message.warn("请登录");
      navigate('/login');
      return false;
    }
  }
  return true;
}

export const RouterGurad = (routes: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    guard(location, navigate, routes);
  }, [location, navigate, routes]);
  const Route = useRoutes(routes);
  return Route;
};
